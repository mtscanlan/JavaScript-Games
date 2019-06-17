const tiles = document.querySelectorAll(".container");
const userGlyph = 'x';

tiles.forEach(t => {
    t.addEventListener('click', () => {
        let childNodeName = `${t.id}-${userGlyph}`;
        document.getElementById(childNodeName).classList.add('show');
    });
});