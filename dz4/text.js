document.getElementById('btn_rep').addEventListener('click', () => {
    const textNew = document.querySelectorAll('.text_li').forEach((item) => {
        // item.innerText = item.innerText.replace(/'/g, '"');
        item.innerText = item.innerText.replace(/\B'|'B\ /g, '"');
    });
});
document.getElementById('btn_def').addEventListener('click', () => {
    const textDef = document.querySelectorAll('.text_li').forEach((item) => {
        item.innerText = item.innerText.replace(/"/g, "'");
    });
});