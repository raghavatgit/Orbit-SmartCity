package services

import "testing"

func TestCongestionClassification(t *testing.T) {
	dw := DensityWindow{VehicleCount: 100, RoadwayLengthMeters: 1000.0}
	level := dw.ComputeCongestionLevel()
	if level != "JAM_LEVEL_CRITICAL" {
		t.Errorf("Expected JAM_LEVEL_CRITICAL, got %s", level)
	}
}
