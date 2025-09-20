// api/recipe.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // For demonstration, we'll use a simulated response
    // In production, you would call the xAI API here
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a sample recipe (replace with actual API call)
    const recipe = getFallbackRecipe(message);
    return res.status(200).json({ recipe });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      recipe: getFallbackRecipe(req.body?.message || '') 
    });
  }
}

function getFallbackRecipe(input) {
  const fallbackRecipes = [
    {
      name: "Truffle Infused Coq au Vin",
      cuisine: "French",
      ingredients: [
        "4 chicken thighs, skin on",
        "2 cups Burgundy red wine",
        "200g pearl onions, peeled",
        "200g cremini mushrooms, quartered",
        "2 tbsp black truffle paste",
        "4 slices thick-cut bacon, diced",
        "2 cloves garlic, minced",
        "2 cups chicken stock",
        "2 tbsp tomato paste",
        "Fresh thyme sprigs",
        "Salt and freshly ground black pepper"
      ],
      instructions: [
        "Season chicken with salt and pepper. In a Dutch oven, cook bacon until crispy. Remove and set aside.",
        "Sear chicken in bacon fat until golden brown on both sides. Remove and set aside.",
        "Sauté pearl onions and mushrooms until caramelized. Add garlic and cook until fragrant.",
        "Add tomato paste and cook for 1 minute. Deglaze with red wine, scraping up browned bits.",
        "Return chicken and bacon to pot. Add chicken stock, thyme, and truffle paste.",
        "Simmer covered for 45 minutes until chicken is tender. Uncover and reduce sauce to desired consistency.",
        "Season to taste and garnish with fresh thyme."
      ],
      tips: [
        "Marinate chicken in wine overnight for deeper flavor",
        "Use fresh black truffle shavings for garnish if available",
        "Serve with creamy mashed potatoes or crusty baguette"
      ],
      score: 92
    },
    {
      name: "Foie Gras Terrine with Fig Compote",
      cuisine: "French",
      ingredients: [
        "1 lb fresh duck foie gras, cleaned",
        "1/4 cup Armagnac or Cognac",
        "1 tsp pink salt (for curing)",
        "1/2 tsp white pepper",
        "1/4 tsp quatre épices (French four-spice blend)",
        "For fig compote: 1 cup dried figs, 1/2 cup port wine, 2 tbsp honey"
      ],
      instructions: [
        "Season foie gras with salt, pepper, and spices. Drizzle with Armagnac.",
        "Cover and refrigerate for 24 hours to marinate.",
        "Preheat oven to 200°F (95°C). Press foie gras into terrine mold.",
        "Place terrine in water bath and bake for 45-50 minutes until internal temperature reaches 115°F (46°C).",
        "Remove from oven, cool to room temperature, then weight down with a light press.",
        "Refrigerate for at least 48 hours before serving.",
        "For compote: Simmer figs with port and honey until softened and syrupy."
      ],
      tips: [
        "Serve terrine chilled with toasted brioche and fig compote",
        "A Sauternes wine pairing elevates this dish beautifully",
        "Use a very sharp knife dipped in hot water for clean slices"
      ],
      score: 96
    },
    {
      name: "Bouillabaisse Marseillaise",
      cuisine: "French",
      ingredients: [
        "500g mixed firm fish (monkfish, sea bass, halibut)",
        "500g shellfish (mussels, clams, shrimp)",
        "1 fennel bulb, thinly sliced",
        "1 onion, diced",
        "4 cloves garlic, minced",
        "1 orange, zest only",
        "1 pinch saffron threads",
        "800g canned tomatoes",
        "1L fish stock",
        "1/4 cup pastis or ouzo",
        "Bouquet garni (thyme, bay leaf, parsley stems)",
        "Rouille sauce for serving",
        "Toasted baguette slices"
      ],
      instructions: [
        "Soak saffron in 2 tbsp warm water. Set aside.",
        "In large pot, sauté fennel and onion until softened. Add garlic and cook until fragrant.",
        "Add pastis and flame to burn off alcohol. Add tomatoes, fish stock, bouquet garni, and saffron with its water.",
        "Simmer for 20 minutes to develop flavors. Season with salt and pepper.",
        "Add firm fish and cook for 5 minutes. Add shellfish and cook until shells open.",
        "Discard any unopened shells. Stir in orange zest.",
        "Serve in bowls with rouille spread on baguette slices."
      ],
      tips: [
        "Use the freshest possible seafood for best results",
        "Traditional rouille includes saffron, garlic, and chili pepper",
        "Serve with a crisp white wine from Provence"
      ],
      score: 94
    }
  ];
  
  // Select recipe based on input keywords
  const inputLower = input.toLowerCase();
  if (inputLower.includes('chicken') || inputLower.includes('poultry')) {
    return fallbackRecipes[0];
  } else if (inputLower.includes('foie gras') || inputLower.includes('terrine')) {
    return fallbackRecipes[1];
  } else if (inputLower.includes('fish') || inputLower.includes('seafood')) {
    return fallbackRecipes[2];
  } else {
    return fallbackRecipes[Math.floor(Math.random() * fallbackRecipes.length)];
  }
}