import hashlib

def anonymize_plate(plate_number: str, salt: str = "orbit_secret_salt") -> str:
    clean = plate_number.strip().upper()
    h = hashlib.sha256()
    h.update((clean + salt).encode('utf-8'))
    return h.hexdigest()[:16]
