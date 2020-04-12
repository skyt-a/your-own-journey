/**
 * 引数のbase64文字列をBlobに変換する
 * @param base64 対象base64文字列
 * @returns {Blob} 変換後Blob
 */
function base64ToBlob(base64: string): Blob {
  const base64Data = base64.split(',')[1]; // Data URLからBase64のデータ部分のみを取得
  const data = atob(base64Data);
  const buff = new ArrayBuffer(data.length);
  const arr = new Uint8Array(buff);
  // blobの生成
  for (let i = 0; i < data.length; i++) {
    arr[i] = data.charCodeAt(i);
  }
  return new Blob([arr], { type: 'image/jpeg' });
}

/**
 * 引数のBlobをbase64文字列に変換する
 * @param blob 対象Blob
 * @returns {Promise<unknown>} 変換Promise
 */
function blobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e): void => resolve(e.target.result);
    reader.onerror = (): void => reject('cast error');
    reader.readAsDataURL(blob);
  });
}

/**
 * 画像オブジェクトを作成し、対象srcを読み込ませる
 * @param src 対象src
 * @returns {Promise<Image>} Promise
 */
function loadImage(src): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = (): void => resolve(img);
    img.onerror = (e): void => reject(e);
    img.src = src;
  });
}

/**
 * 画像メタ情報からOrientation指定を取得する
 * Orientationの指定はIFDという領域内にあるため、その中から取得する
 * @param buffer 対象バッファ
 * @returns {number}
 */
function getOrientationFromImageMeta(buffer: ArrayBuffer): number {
  // エンディアンの違いでロジックを切り替えるのが煩雑なのでDataView APIを使う
  const dataView = new DataView(buffer);
  // メタ情報があるかどうかを判定するためのバイト列開始位置
  let startMetaPosition = 2;
  // 対象画像メタ情報がEXIFではなく、JFIFの場合は取得位置をずらす
  // (iOSの「写真を撮る」はJFIFになり、フォトライブラリからのアップロードはEXIFになる)
  if (dataView.getUint16(startMetaPosition) !== 65505) {
    const length = dataView.getUint16(4);
    startMetaPosition += length + 2;
  }
  // JFIFでもEXIFでもない場合は後続の処理は不要なため0を返却
  if (dataView.getUint16(startMetaPosition) !== 65505) {
    return 0;
  }
  const isLittleEndian = dataView.getUint8(startMetaPosition + 10) === 73;
  // IFD内のタグの数を確認
  const count = dataView.getUint16(startMetaPosition + 18, isLittleEndian);
  for (let i = 0; i < count; i++) {
    const start = startMetaPosition + 20 + i * 12; // 各フィールドは12バイト
    const tag = dataView.getUint16(start, isLittleEndian);
    // Orientationのフィールドは274(0x0112)から始まる
    if (tag === 274) {
      return dataView.getUint16(start + 8, isLittleEndian);
    }
  }
  return 0;
}

/**
 * Orientation情報から、対象画像を貼り付けて適切に回転させたcanvasを取得する
 * @param orientation 画像向き情報
 * @param img 対象画像
 * @returns {HTMLCanvasElement}　canvas要素
 */
function createRotatedCanvasByOrientation(
  orientation: number,
  img: HTMLImageElement
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // 180度回転している場合は縦横長を逆転したcanvasを作成する必要がある
  if ([5, 6, 7, 8].indexOf(orientation) > -1) {
    canvas.width = img.height;
    canvas.height = img.width;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }
  // Orientationの値に応じて加工する
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, img.width, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, img.width, img.height);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, img.height);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, img.height, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, img.height, img.width);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, img.width);
      break;
  }
  ctx.drawImage(img, 0, 0);
  return canvas;
}

/**
 * 対象ArrayBufferを画像メタ情報から適切に回転させてdataURLとして取得する
 * @param arrayBuffer 対象ArrayBuffer
 * @returns {Promise<string>} dataURL
 */
export default async function arrayBufferToOrientedImageDataURL(
  arrayBuffer: ArrayBuffer
): Promise<string> {
  const orientation = getOrientationFromImageMeta(arrayBuffer);
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  const objectURL = URL.createObjectURL(blob);
  const img = new Image();
  await new Promise(resolve => {
    img.addEventListener(
      'load',
      () => {
        // 解放処理
        window.URL.revokeObjectURL(objectURL);
        resolve();
      },
      { once: true }
    );
    img.src = objectURL;
  });
  const canvas = createRotatedCanvasByOrientation(orientation, img);
  return canvas.toDataURL('image/jpeg');
}

/**
 * 対象画像を上限サイズ(MB指定)以下になるように圧縮する
 * @param imageDataURL 対象画像
 * @param maxSizeByte 上限バイトサイズ
 * @returns {Promise<unknown>} Promise
 */
export async function compressImage(
  imageDataURL: string,
  maxSizeByte: number
): Promise<string | ArrayBuffer> {
  // canvas要素を作成し、対象画像を描画する
  const image = await loadImage(imageDataURL);
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  // オリジナル容量(画質落としてない場合の容量)を取得
  const originalBinary = canvas.toDataURL('image/png');
  const originalBlob = base64ToBlob(originalBinary);
  const originalSize = originalBlob['size'];
  const uploadBlob = originalBlob;
  if (originalSize > maxSizeByte) {
    // 対象画像が上限サイズ以上なら圧縮する
    const capacityRatio = maxSizeByte / originalSize;
    const processingBinary = canvas.toDataURL('image/jpeg', capacityRatio); // 画質落としてバイナリ化
    return Promise.resolve(processingBinary);
  }
  return blobToBase64(uploadBlob);
}

/**
 * 画像加工処理を行う
 * @param dataURL dataURL
 * @param input ファイルinput要素
 * @param extension 拡張子
 * @returns {Promise<string>} 加工結果
 */
export async function processImage(
  dataURL: string | ArrayBuffer,
  file: File,
  extension: string
): Promise<string | ArrayBuffer> {
  let processed: string | ArrayBuffer = dataURL;
  // jpgの場合のみ回転方向の補正処理を行う
  if (extension === 'jpg') {
    processed = await arrayBufferToOrientedImageDataURL(dataURL as ArrayBuffer);
  }
  // ファイルサイズが上限サイズを超えている場合は圧縮処理を行う
  const maxFileSizeByte = 5 * 1024 * 1024;
  if (file.size > maxFileSizeByte) {
    processed = await compressImage(processed as string, maxFileSizeByte);
  }
  return processed;
}

/**
 * 対象バッファがバイナリベースで有効な画像であるかどうか検証する
 * 有効な画像の場合はその拡張子を返却する
 * なお、この関数はjpg, png, gifのみを有効な画像としている
 * @param arrayBuffer 対象バッファ
 * @returns {string} 判定結果
 */
export function checkValidImageFileExtension(arrayBuffer) {
  const ba = new Uint8Array(arrayBuffer);
  let headerStr = '';
  let headerHex = '';
  for (let i = 0; i < 10; i++) {
    headerHex += ba[i].toString(16);
    headerStr += String.fromCharCode(ba[i]);
  }
  if (headerHex.includes('ffd8')) {
    return 'jpg';
  } else if (headerStr.includes('PNG')) {
    return 'png';
  } else if (headerStr.includes('GIF')) {
    return 'gif';
  }
  return null;
}

/**
 * アップロード画像のファイル形式チェックを実行する
 * @param event アップロードイベント
 * @param errorNoticeArea エラーが存在する場合に通知を表示する場所
 */
export function doCheckUploadedImageFileExtension(event): Promise<string | null> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      e => {
        const extension = checkValidImageFileExtension(e.target.result);
        if (!extension) {
          event.target.files = null;
          reject('有効なファイルではありません');
        } else {
          resolve(extension);
        }
      },
      { once: true }
    );
    reader.readAsArrayBuffer(event.target.files[0]);
  }).catch(error => {
    return error;
  });
}
