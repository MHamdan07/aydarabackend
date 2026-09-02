import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storePath = path.resolve(__dirname, '../../data/store.json');

async function migrate() {
  if (!isSupabaseConfigured()) {
    console.error('\n❌ Supabase is not connected! Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in backend/.env');
    process.exit(1);
  }

  console.log('Reading local data store...');
  const raw = fs.readFileSync(storePath, 'utf8');
  const store = JSON.parse(raw);

  console.log('\n--- STARTING SUPABASE MIGRATION ---');

  // 1. Categories
  if (Array.isArray(store.categories) && store.categories.length > 0) {
    console.log(`Migrating ${store.categories.length} categories...`);
    for (const cat of store.categories) {
      await supabase.from('categories').upsert({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
        image_url: cat.image || cat.imageUrl || '',
        order_index: cat.order || 0,
        is_active: cat.isActive !== false
      }, { onConflict: 'id' });
    }
    console.log('✓ Categories migrated.');
  }

  // 2. Products
  if (Array.isArray(store.products) && store.products.length > 0) {
    console.log(`Migrating ${store.products.length} products...`);
    for (const prod of store.products) {
      await supabase.from('products').upsert({
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        subtitle: prod.subtitle || '',
        description: prod.description || '',
        price: prod.price,
        compare_at_price: prod.comparePrice || prod.compareAtPrice || null,
        sku: prod.sku || '',
        category_slug: prod.category || '',
        images: prod.images || [],
        sizes: prod.sizes || ['XS', 'S', 'M', 'L', 'XL'],
        colors: prod.colors || [],
        pricing_options: prod.pricingOptions || [],
        size_chart: prod.sizeChart || {},
        stock: prod.stock || 10,
        status: prod.status || 'published',
        is_new_arrival: Boolean(prod.isNewArrival),
        is_best_seller: Boolean(prod.isBestSeller),
        is_featured: Boolean(prod.isFeatured)
      }, { onConflict: 'id' });
    }
    console.log('✓ Products migrated.');
  }

  // 3. Settings
  if (store.settings) {
    console.log('Migrating global settings...');
    await supabase.from('settings').upsert({
      id: 'global_maison_settings',
      data: store.settings
    }, { onConflict: 'id' });
    console.log('✓ Settings migrated.');
  }

  // 4. Users
  if (Array.isArray(store.users) && store.users.length > 0) {
    console.log(`Migrating ${store.users.length} users...`);
    for (const u of store.users) {
      await supabase.from('users').upsert({
        id: u.id,
        name: u.name,
        email: u.email,
        password_hash: u.passwordHash,
        role: u.role || 'customer',
        phone: u.phone || '',
        created_at: u.createdAt || new Date().toISOString()
      }, { onConflict: 'id' });
    }
    console.log('✓ Users migrated.');
  }

  console.log('\n🌟 ALL DATA SUCCESSFULLY MIGRATED TO SUPABASE CLOUD DATABASE!\n');
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
