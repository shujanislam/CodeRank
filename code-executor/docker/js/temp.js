
    function execute(a, b) {
  return a * b;
}
    const result = execute(-1, 5);
    const expected = -5;
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('Failed: got', result, 'but expected', expected);
    }
  