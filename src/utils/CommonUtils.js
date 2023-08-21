class CommonUtils {
  static getBase64 = (file) =>
    new Promise((resolve, reject) => {
      //Khi đọc file thì nó đã trả ra kiểu Base64 cho mình rồi
      const reader = new FileReader(); //1 Tạo 1 cái Buffer - tạo 1 cái API của HTML
      reader.readAsDataURL(file); //2 Đọc file của mình đưa lên
      reader.onload = () => resolve(reader.result); // onload đưa ra kết quả
      reader.onerror = error => reject(error);
    });
}

export default CommonUtils;
