package handlers

import (
	"strings"
	"testing"
)

func TestValidateRealisasiKegiatan(t *testing.T) {
	valid := []string{"0", "0%", "20", "20%", " 50 ", " 50% ", "100", "100%"}
	for _, value := range valid {
		got, err := normalizeRealisasiKegiatan(value, true)
		expected := strings.TrimSuffix(strings.TrimSpace(value), "%") + "%"
		if err != nil || got != expected {
			t.Errorf("expected %q to normalize to %q, got %q: %v", value, expected, got, err)
		}
	}

	invalid := []string{"selesai", "seratus persen", "abc", "50 persen", "20%%", "101", "101%", "-1", "-1%", ""}
	for _, value := range invalid {
		if _, err := normalizeRealisasiKegiatan(value, true); err == nil {
			t.Errorf("expected %q to be invalid", value)
		}
	}
	if got, err := normalizeRealisasiKegiatan("", false); err != nil || got != "" {
		t.Fatalf("empty value should be allowed for drafts: got %q, %v", got, err)
	}
	if _, err := normalizeRealisasiKegiatan("", true); err == nil {
		t.Fatal("empty value should be rejected for submitted reports")
	}
}
