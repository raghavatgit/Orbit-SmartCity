def test_doppler_velocity():
    # Test 24 GHz Doppler radar shift of 1600 Hz corresponds to ~36 km/h
    delta_f = 1600.0
    c = 299792458.0
    f0 = 24.125e9
    v_kmh = (delta_f * c / (2 * f0)) * 3.6
    assert 35.0 <= v_kmh <= 37.0
