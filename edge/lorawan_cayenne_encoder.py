def encode_temperature(channel: int, temp_c: float) -> bytes:
    temp_val = int(temp_c * 10)
    return bytes([channel, 0x67]) + temp_val.to_bytes(2, byteorder='big', signed=True)

def encode_illuminance(channel: int, lux: int) -> bytes:
    return bytes([channel, 0x65]) + lux.to_bytes(2, byteorder='big', signed=False)
