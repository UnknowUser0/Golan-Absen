import { isValidRealisasiKegiatan } from './work-report-validation';

describe('realisasi kegiatan validation', () => {
  it('accepts numeric percentages from 0 through 100%', () => {
    ['0', '0%', '20', '20%', '50', '50%', '99', '100'].forEach(value => {
      expect(isValidRealisasiKegiatan(value)).toBeTrue();
    });
  });

  it('rejects non-percent, malformed, and out-of-range values', () => {
    ['selesai', 'seratus persen', 'abc', '50 persen', '20%%', '101', '101%', '-1', '-1%', ''].forEach(value => {
      expect(isValidRealisasiKegiatan(value)).toBeFalse();
    });
  });
});
