//!*script
// ファイル名 get_newest_filename.js
// 最後に変更したファイル名または最後にアクセスしたファイル名を返す。
// 第一引数: 最後に変更したファイル = Modify 最後にアクセスしたファイル = Access
//
// 使用例
// KC_main = {
// 8    ,%J %*script("%0script\get_newest_filename.js" Modify) %:*range cursor -highlight:7
// 9    ,%J %*script("%0script\get_newest_filename.js" Access)
// }
//

// 引数がなければ終了
if (PPx.Arguments.Length < 1) {
  PPx.Echo("引数が正しくありません");
  PPx.Quit();
}

var newestType = PPx.Argument(1);
var newestFile = null;
var newestDate = null;

for (var i = 0; i < PPx.Entry.Count; i++) {
  if (!(PPx.Entry.Item(i).Attributes & 16)) {
    //ディレクトリエントリは除外
    if (newestType == "Modify") {
      var date = PPx.Entry.Item(i).DateLastModified;
    }
    if (newestType == "Access") {
      var date = PPx.Entry.Item(i).DateLastAccessed;
    }
    if (newestDate == null || date > newestDate) {
      newestFile = PPx.Entry.Item(i).Name;
      newestDate = date;
    }
  }
}

PPx.result = newestFile;
