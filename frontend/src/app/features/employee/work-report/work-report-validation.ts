import { isValidRealisasiKegiatanValue } from '../../../core/utils/realisasi-kegiatan';

export const REALISASI_KEGIATAN_ERROR =
  'Realisasi kegiatan harus berupa angka antara 0 sampai 100, contoh: 20, 50, atau 100.';

/** Returns true only for an integer percentage from 0 through 100%. */
export function isValidRealisasiKegiatan(value: string | null | undefined): boolean {
  return isValidRealisasiKegiatanValue(value, true);
}
