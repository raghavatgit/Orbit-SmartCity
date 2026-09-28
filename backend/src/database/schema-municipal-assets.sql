CREATE TABLE IF NOT EXISTS municipal_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_type VARCHAR(64) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
