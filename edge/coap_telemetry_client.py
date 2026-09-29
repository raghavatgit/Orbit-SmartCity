class CoapTelemetryClient:
    def __init__(self, endpoint_host: str, port: int = 5683):
        self.endpoint_host = endpoint_host
        self.port = port

    def build_post_packet(self, resource_path: str, payload_bytes: bytes) -> bytes:
        # Construct header: Ver=1, T=CON, Code=0.02 (POST)
        header = b'\x40\x02\x12\x34'
        uri_option = b'\xb0' + resource_path.encode('utf-8')
        payload_marker = b'\xff'
        return header + uri_option + payload_marker + payload_bytes
