
    function execute(a, b) {
      return a * b + a;
    }
    const result = execute(6, 0);
    const expected = 0;
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('Failed: got', result, 'but expected', expected);
    }
  