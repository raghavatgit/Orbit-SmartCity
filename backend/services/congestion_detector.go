package services

type DensityWindow struct {
	VehicleCount int
	RoadwayLengthMeters float64
}

func (dw *DensityWindow) ComputeCongestionLevel() string {
	densityPerKm := (float64(dw.VehicleCount) / dw.RoadwayLengthMeters) * 1000.0
	if densityPerKm > 80.0 {
		return "JAM_LEVEL_CRITICAL"
	} else if densityPerKm > 45.0 {
		return "CONGESTED"
	}
	return "FLOW_FREE"
}
