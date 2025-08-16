-- Create items table for lost and found functionality
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a community lost & found)
CREATE POLICY "Anyone can view items" 
ON public.items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create items" 
ON public.items 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on common queries
CREATE INDEX idx_items_type ON public.items(type);
CREATE INDEX idx_items_category ON public.items(category);
CREATE INDEX idx_items_created_at ON public.items(created_at DESC);