// Realistic product image mappings by product name / category
export const getProductImageUrl = (product) => {
  if (!product) return 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?auto=format&fit=crop&w=600&q=80';

  const name = (product.name || '').toLowerCase();
  const category = (product.category || '').toLowerCase();

  // Specific Product Name Mappings
  if (name.includes('macbook')) return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80';
  if (name.includes('dell xps')) return 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80';
  if (name.includes('thinkpad')) return 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80';
  if (name.includes('hp pavilion') || name.includes('surface')) return 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80';

  if (name.includes('sony wh') || name.includes('xm5')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
  if (name.includes('airpods')) return 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80';
  if (name.includes('bose') || name.includes('jbl') || name.includes('beats')) return 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80';

  if (name.includes('iphone')) return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
  if (name.includes('galaxy') || name.includes('pixel') || name.includes('oneplus')) return 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80';

  if (name.includes('ps5') || name.includes('switch') || name.includes('console')) return 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80';
  if (name.includes('tv')) return 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80';
  if (name.includes('camera') || name.includes('canon') || name.includes('dslr')) return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80';
  if (name.includes('echo')) return 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80';

  if (name.includes('lego')) return 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80';
  if (name.includes('hot wheels') || name.includes('nerf') || name.includes('barbie')) return 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80';

  if (name.includes('nike') || name.includes('adidas')) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';
  if (name.includes('levi') || name.includes('jeans')) return 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
  if (name.includes('ray-ban') || name.includes('sunglasses')) return 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80';

  // Category Fallbacks
  if (category.includes('laptop')) return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80';
  if (category.includes('headphone')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
  if (category.includes('mobile')) return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
  if (category.includes('electronics')) return 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?auto=format&fit=crop&w=800&q=80';
  if (category.includes('toy')) return 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80';
  if (category.includes('fashion')) return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

  return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
};
