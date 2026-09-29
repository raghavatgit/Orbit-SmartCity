import statistics

class SensorAnomalyDetector:
    def __init__(self, window_size=30, z_threshold=3.0):
        self.window_size = window_size
        self.z_threshold = z_threshold
        self.history = []

    def is_anomaly(self, val: float) -> bool:
        if len(self.history) < self.window_size:
            self.history.append(val)
            return False
        mean = statistics.mean(self.history)
        stdev = statistics.stdev(self.history)
        self.history.pop(0)
        self.history.append(val)
        if stdev == 0:
            return False
        z_score = abs(val - mean) / stdev
        return z_score > self.z_threshold
