const styles = [
  'opacity:0',
  'opacity:0;transform:scale(0.98)',
  'word-break:keep-all;overflow-wrap:normal;opacity:0;transform:translateY(25px)',
  'background:linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.90) 25%, rgba(5,5,5,0.1) 60%, transparent 100%)'
];

styles.forEach(s => {
  let cleaned = s
    .replace(/(^|;)opacity:\s*0;?/g, '$1')
    .replace(/(^|;)transform:\s*(scale|translate|none)[^;]*;?/g, '$1')
    .replace(/;+/g, ';')
    .replace(/^;/, '')
    .replace(/;$/, '');
  console.log(`"${s}" -> "${cleaned}"`);
});
