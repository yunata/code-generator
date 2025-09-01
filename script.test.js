const { getSelectedLibraries, getLibraryUrls } = require('./script.js');

describe('getSelectedLibraries', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="checkbox" id="useThreeJs">
      <input type="checkbox" id="useAnimeJs">
      <input type="checkbox" id="useGsap">
      <input type="checkbox" id="useP5">
    `;
  });

  test('returns empty array when no libraries selected', () => {
    expect(getSelectedLibraries()).toEqual([]);
  });

  test('returns selected libraries', () => {
    document.getElementById('useThreeJs').checked = true;
    document.getElementById('useP5').checked = true;
    expect(getSelectedLibraries()).toEqual(['three.js', 'p5.js']);
  });
});

describe('getLibraryUrls', () => {
  test('returns URLs for selected libraries', () => {
    const urls = getLibraryUrls(['three.js', 'anime.js']);
    expect(urls).toEqual([
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
    ]);
  });

  test('ignores unknown libraries', () => {
    expect(getLibraryUrls(['unknown'])).toEqual([]);
  });
});
