export function testAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // throw new Error("login error");
      reject("login error");
    }, 3000);
  });
}
