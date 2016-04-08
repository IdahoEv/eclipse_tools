var ArrayShuffler = class {
  static shuffle(arr) {
    return arr.sort(() => {
      return Math.random();
    })
  }
}
