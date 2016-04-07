var ArrayTools = class {
  static shuffle(arr) {
    return arr.sort(() => {
      return Math.random();
    })
  }

  static unique(arr) {
    return arr.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
  }
}

export default ArrayTools;
