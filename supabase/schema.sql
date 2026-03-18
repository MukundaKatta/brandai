-- BrandAI Database Schema
CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, company TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS brand_settings (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id), tone TEXT, personality TEXT, vocabulary TEXT, do_list TEXT[] DEFAULT '{}', dont_list TEXT[] DEFAULT '{}', colors JSONB DEFAULT '{}', fonts JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS content (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, body TEXT, type TEXT NOT NULL, status TEXT DEFAULT 'draft', tags TEXT[] DEFAULT '{}', seo_score INTEGER, user_id UUID REFERENCES profiles(id), campaign_id UUID, metadata JSONB DEFAULT '{}', scheduled_at TIMESTAMPTZ, published_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS campaigns (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, description TEXT, channels TEXT[] DEFAULT '{}', status TEXT DEFAULT 'planning', budget DECIMAL, start_date DATE, end_date DATE, user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS ab_tests (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, content_id UUID REFERENCES content(id), variant_a TEXT, variant_b TEXT, a_metrics JSONB DEFAULT '{}', b_metrics JSONB DEFAULT '{}', status TEXT DEFAULT 'draft', winner TEXT, confidence FLOAT, user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS compliance_checks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), content_id UUID REFERENCES content(id), status TEXT DEFAULT 'pending', issues JSONB DEFAULT '[]', score INTEGER, checked_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users own brand" ON brand_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own content" ON content FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own campaigns" ON campaigns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own tests" ON ab_tests FOR ALL USING (auth.uid() = user_id);
