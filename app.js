const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");

var dirname = "";
var filename = "";
var content = "";

var instruction = () => {
  console.log("\n***********************************************\n");
  console.log("\n 1.create  Directory ..");
  console.log("\n 2.remove Directory ..");
  console.log("\n 3.write file..");
  console.log("\n 4.read file..");
  console.log("\n 5.delete a text file..");
  console.log("\n 6.Append Data To file..");
  console.log("\n 7.Update / Replace file with new data ..");
  console.log("\n 8.Rename a text file..");
  console.log("\n 9.exit");
  console.log("\n***********************************************\n");
  start();
};

var start = () => {
  rl.question("Enter Your Choice :- ", (answer) => {
    switch (answer) {
      case "1":
        createDir();
        break;
      case "2":
        removeDir();
        break;
      case "3":
        writeFile();
        break;
      case "4":
        readFile();
        break;
      case "5":
        deleteFile();
        break;
      case "6":
        appendFile();
        break;
      case "7":
        replaceFile();
        break;
      case "8":
        renameFile();
        break;
      case "9":
        rl.close();
        break;
      default:
        console.log("Please Enter Valid Number");
        repeat();
    }
  });
};

var createDir = () => {
  rl.question("Name Of The Directory :-", (ans) => {
    dirname = ans;
    create_Dir();
  });
};

var create_Dir = () => {
  fs.mkdir(dirname, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Directory Created SuccessFully..." + dirname);
    }
    repeat();
  });
};

var removeDir = () => {
  rl.question("Enter Directory Name :- ", (ans) => {
    dirname = ans;
    removeDir1();
  });
};

var removeDir1 = () => {
  fs.rmdir(dirname, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Directory Removed Successfully...!");
    }
    repeat();
  });
};

var writeFile = () => {
  rl.question("Enter File Name :-", (ans) => {
    filename = ans;
    rl.question("Enter File Content :-", (ans) => {
      content = ans;
      writeFileData();
    });
  });
};

var writeFileData = () => {
  fs.writeFile(filename + ".txt", content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File Created SuccessFully...!", filename);
    }
    repeat();
  });
};

var readFile = () => {
  rl.question("Enter File Name :- ", (ans) => {
    filename = ans;
    fs.readFile(filename + ".txt", "utf8", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
      repeat();
    });
  });
};

var deleteFile = () => {
  rl.question("Enter File Name :- ", (ans) => {
    fs.unlink(ans + ".txt", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Deleted SuccessFully ....!" + ans);
      }
      repeat();
    });
  });
};

var appendFile = () => {
  rl.question("Enter File Name To A Append :- ", (ans) => {
    filename = ans;
    rl.question("Enter Content :-", (ans) => {
      content = ans;
      fs.appendFile(filename + ".txt", content, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File Appended Successfully..!" + filename);
        }
        repeat();
      });
    });
  });
};

var replaceFile = () => {
  rl.question("Enter Your File Name :- ", (ans) => {
    filename = ans;
    rl.question("Enter Content Of Replace :- ", (ans) => {
      content = ans;
      rl.question("Enter New Content To Replace :-", (ans) => {
        const replace_Str = ans;
        fs.readFile(filename + ".txt", "utf8", (err, data) => {
          if (err) {
            console.log(err);
            repeat();
          } else {
            const res = data.replace(content, replace_Str);
            fs.writeFile(filename + ".txt", res, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  "File Updated / Replaced SuccessFully...!" + filename
                );
              }
              repeat();
            });
          }
        });
      });
    });
  });
};

var renameFile = () => {
  rl.question("Enter Old File Name :-", (ans) => {
    var oldFile = ans;
    rl.question("Enter New File Name :- ", (ans) => {
      fs.rename(oldFile + ".txt", ans + ".txt", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File Renamed SuccessFully ... !" + ans + ".txt");
        }
        repeat();
      });
    });
  });
};

var repeat = () => {
  instruction();
};

repeat();
