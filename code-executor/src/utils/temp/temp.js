
    function execute(a, b) {
      return a + a + b + b;
    }
    const result = execute(1, 2);
    const expected = 3;
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('❌ Failed: got', result, 'but expected', expected);
    }
  