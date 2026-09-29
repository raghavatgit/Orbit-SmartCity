def compute_doppler_velocity(delta_f_hz: float, carrier_freq_ghz: float = 24.125) -> float:
    # v = (delta_f * c) / (2 * f0)
    c = 299792458.0 # speed of light m/s
    f0 = carrier_freq_ghz * 1e9
    v_mps = (delta_f_hz * c) / (2 * f0)
    return round(v_mps * 3.6, 2) # return km/h
