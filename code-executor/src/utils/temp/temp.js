
    function execute(a, b) {
  return b / a;
}
    const result = execute(10, 2);
    const expected = 5;
    if (result === expected) {
      console.log('✅ Passed');
    } else {
      console.log('Failed: got', result, 'but expected', expected);
    }
  