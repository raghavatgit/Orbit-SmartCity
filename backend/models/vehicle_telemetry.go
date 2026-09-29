package models

import "time"

type VehicleTelemetry struct {
	VehicleID   string    `json:"vehicle_id"`
	RouteID     string    `json:"route_id"`
	Latitude    float64   `json:"latitude"`
	Longitude   float64   `json:"longitude"`
	SpeedKmh    float64   `json:"speed_kmh"`
	Occupancy   int       `json:"occupancy_percent"`
	Timestamp   time.Time `json:"timestamp"`
}
