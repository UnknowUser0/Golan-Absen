import {
  formatRealisasiKegiatan,
  isValidRealisasiKegiatanValue,
  realisasiKegiatanInputValue
} from './realisasi-kegiatan';

describe('realisasi kegiatan formatting', () => {
  it('formats numeric and persisted percentage values without duplicating the suffix', () => {
    expect(formatRealisasiKegiatan('80')).toBe('80%');
    expect(formatRealisasiKegiatan('80%')).toBe('80%');
    expect(formatRealisasiKegiatan('80%%')).toBe('80%');
    expect(formatRealisasiKegiatan('')).toBe('-');
    expect(formatRealisasiKegiatan(null)).toBe('-');
  });

  it('removes the suffix when loading an existing value into the input', () => {
    expect(realisasiKegiatanInputValue('80%')).toBe('80');
    expect(realisasiKegiatanInputValue(' 80 ')).toBe('80');
  });

  it('accepts numeric input and the legacy suffix, with the 0-100 range', () => {
    for (const value of ['0', '0%', '80', '80%', '100']) {
      expect(isValidRealisasiKegiatanValue(value, true)).toBeTrue();
    }
    for (const value of ['101', '-5', 'abc', '80%%']) {
      expect(isValidRealisasiKegiatanValue(value, false)).toBeFalse();
    }
    expect(isValidRealisasiKegiatanValue('', true)).toBeFalse();
  });
});
