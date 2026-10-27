window.OIS_CATALOG = {
  currency: '₦',
  whatsappNumber: '2349067234304',

  categories: [
    {
      id: 'vegetables',
      navLabel: 'Vegetables',
      group: 'Fresh produce',
      title: 'Vegetables',
      description: 'Farm-fresh vegetables, sorted and handled with care, sold by the basket, bucket or bag.',
      action: {
        label: 'Order',
        message: 'Hello Ogas Integrated Services, I would like to order {name}. Please confirm the current price and availability.'
      },
      items: [
        {
          name: 'Tomatoes',
          note: 'Firm, ripe and sorted',
          image: 'assets/images/products/vegetables/tomatoes.jpg',
          prices: [
            { unit: 'Basket', amount: 45000 },
            { unit: 'Bucket', amount: 12000 }
          ]
        },
        {
          name: 'Fresh Pepper',
          note: 'Tatashe and scotch bonnet',
          image: 'assets/images/products/vegetables/fresh-pepper.jpg',
          prices: [
            { unit: 'Basket', amount: 35000 },
            { unit: 'Bucket', amount: 10000 }
          ]
        },
        {
          name: 'Ugu (Fluted Pumpkin)',
          note: 'Freshly cut leaves',
          image: 'assets/images/products/vegetables/ugu.jpg',
          prices: [
            { unit: 'Bag', amount: 5000 },
            { unit: 'Bunch', amount: 500 }
          ]
        },
        {
          name: 'Okra',
          note: 'Tender, green pods',
          image: 'assets/images/products/vegetables/okra.jpg',
          prices: [
            { unit: 'Basket', amount: 18000 },
            { unit: 'Bucket', amount: 6000 }
          ]
        }
      ]
    },

    {
      id: 'tubers',
      navLabel: 'Tubers',
      group: 'Fresh produce',
      title: 'Tubers',
      description: 'Hearty, freshly harvested tubers, sold by the tuber, bag or bucket.',
      action: {
        label: 'Order',
        message: 'Hello Ogas Integrated Services, I would like to order {name}. Please confirm the current price and availability.'
      },
      items: [
        {
          name: 'Yam',
          note: 'Large, firm tubers',
          image: 'assets/images/products/tubers/yam.jpg',
          prices: [
            { unit: 'Per tuber', amount: 4500 },
            { unit: 'Bundle of 10', amount: 42000 }
          ]
        },
        {
          name: 'Cassava',
          note: 'Freshly harvested',
          image: 'assets/images/products/tubers/cassava.jpg',
          prices: [
            { unit: 'Bag', amount: 12000 },
            { unit: 'Bucket', amount: 3000 }
          ]
        },
        {
          name: 'Sweet Potato',
          note: 'Sweet and firm',
          image: 'assets/images/products/tubers/sweet-potato.jpg',
          prices: [
            { unit: 'Bag', amount: 15000 },
            { unit: 'Basket', amount: 9000 }
          ]
        },
        {
          name: 'Cocoyam',
          note: 'Clean and sorted',
          image: 'assets/images/products/tubers/cocoyam.jpg',
          prices: [
            { unit: 'Bag', amount: 20000 },
            { unit: 'Bucket', amount: 5000 }
          ]
        }
      ]
    },

    {
      id: 'grains',
      navLabel: 'Grains & Legumes',
      group: 'Fresh produce',
      title: 'Grains & Legumes',
      description: 'Dry, clean and well sorted staples, sold by the sack or bucket.',
      action: {
        label: 'Order',
        message: 'Hello Ogas Integrated Services, I would like to order {name}. Please confirm the current price and availability.'
      },
      items: [
        {
          name: 'Maize (Corn)',
          note: 'Dry, clean grain',
          image: 'assets/images/products/grains/maize.jpg',
          prices: [
            { unit: 'Sack', amount: 65000 },
            { unit: 'Bucket', amount: 4000 }
          ]
        },
        {
          name: 'Beans (Brown)',
          note: 'Hand-sorted, stone-free',
          image: 'assets/images/products/grains/beans.jpg',
          prices: [
            { unit: 'Sack', amount: 150000 },
            { unit: 'Bucket', amount: 9000 }
          ]
        },
        {
          name: 'Local Rice',
          note: 'Stone-free, well milled',
          image: 'assets/images/products/grains/rice.jpg',
          prices: [
            { unit: 'Sack', amount: 75000 },
            { unit: 'Bucket', amount: 5500 }
          ]
        },
        {
          name: 'Guinea Corn (Sorghum)',
          note: 'Dry, clean grain',
          image: 'assets/images/products/grains/guinea-corn.jpg',
          prices: [
            { unit: 'Sack', amount: 60000 },
            { unit: 'Bucket', amount: 3500 }
          ]
        }
      ]
    },

    {
      id: 'processed',
      navLabel: 'Processed Goods',
      group: 'Agro-processing',
      title: 'Processed Goods',
      description: 'Everyday staples and oils, processed and packed for the kitchen and the shop.',
      action: {
        label: 'Order',
        message: 'Hello Ogas Integrated Services, I would like to order {name}. Please confirm the current price and availability.'
      },
      items: [
        {
          name: 'Garri (White)',
          note: 'Crisp, well fried',
          image: 'assets/images/products/processed/garri.jpg',
          prices: [
            { unit: 'Bag', amount: 45000 },
            { unit: 'Bucket', amount: 3000 }
          ]
        },
        {
          name: 'Palm Oil',
          note: 'Pure, unadulterated',
          image: 'assets/images/products/processed/palm-oil.jpg',
          prices: [
            { unit: 'Keg (25L)', amount: 70000 },
            { unit: 'Bottle (1L)', amount: 3000 }
          ]
        },
        {
          name: 'Groundnut Oil',
          note: 'Freshly pressed',
          image: 'assets/images/products/processed/groundnut-oil.jpg',
          prices: [
            { unit: 'Keg (25L)', amount: 110000 },
            { unit: '5 Litres', amount: 22000 }
          ]
        },
        {
          name: 'Yam Flour (Elubo)',
          note: 'Fine, clean flour',
          image: 'assets/images/products/processed/yam-flour.jpg',
          prices: [
            { unit: 'Bag', amount: 55000 },
            { unit: 'Bucket', amount: 4500 }
          ]
        }
      ]
    },

    {
      id: 'livestock',
      navLabel: 'Livestock',
      group: 'Farm animals',
      title: 'Livestock',
      description: 'Healthy, well-raised animals for your farm, your table or your business.',
      action: {
        label: 'Order',
        message: 'Hello Ogas Integrated Services, I would like to order {name}. Please confirm the current price and availability.'
      },
      items: [
        {
          name: 'Broiler Chickens',
          note: 'Market-weight birds',
          image: 'assets/images/products/livestock/broilers.jpg',
          prices: [
            { unit: 'Each', amount: 9000 },
            { unit: 'Pack of 10', amount: 85000 }
          ]
        },
        {
          name: 'Point-of-Lay Hens',
          note: 'Ready to start laying',
          image: 'assets/images/products/livestock/point-of-lay.jpg',
          prices: [
            { unit: 'Each', amount: 7000 },
            { unit: 'Pack of 10', amount: 65000 }
          ]
        },
        {
          name: 'Goats',
          note: 'Healthy, well fed',
          image: 'assets/images/products/livestock/goats.jpg',
          prices: [
            { unit: 'Medium', amount: 85000 },
            { unit: 'Large', amount: 150000 }
          ]
        },
        {
          name: 'Catfish',
          note: 'Fresh, live table-size fish',
          image: 'assets/images/products/livestock/catfish.jpg',
          prices: [
            { unit: 'Per kg', amount: 4500 },
            { unit: 'Per 10 kg', amount: 43000 }
          ]
        }
      ]
    },

    {
      id: 'consultation',
      navLabel: 'Consultation',
      group: 'Farm consulting',
      title: 'Consultation',
      description: 'Practical, field-tested advice from people who farm. Book a session for the help you need.',
      action: {
        label: 'Book',
        message: 'Hello Ogas Integrated Services, I would like to book a consultation on {name}. Please share the available dates and the fee.'
      },
      items: [
        {
          name: 'Farm Planning & Setup',
          note: 'Layout, crop choice and budget for a new or growing farm',
          image: 'assets/images/products/consultation/farm-planning.jpg',
          prices: [
            { unit: 'Per session', amount: 25000 },
            { unit: 'Full plan', amount: 150000 }
          ]
        },
        {
          name: 'Crop & Soil Management',
          note: 'Soil, pest and yield advice for your current crops',
          image: 'assets/images/products/consultation/crop-soil.jpg',
          prices: [
            { unit: 'Per session', amount: 20000 },
            { unit: 'Farm visit', amount: 50000 }
          ]
        },
        {
          name: 'Agribusiness & Marketing',
          note: 'Pricing, market access and record keeping',
          image: 'assets/images/products/consultation/agribusiness.jpg',
          prices: [
            { unit: 'Per session', amount: 20000 }
          ]
        },
        {
          name: 'Processing Setup Advice',
          note: 'Turn your harvest into market-ready products',
          image: 'assets/images/products/consultation/processing-setup.jpg',
          prices: [
            { unit: 'Per session', amount: 30000 }
          ]
        }
      ]
    },

    {
      id: 'tools',
      navLabel: 'Tools',
      group: 'Equipment supply',
      title: 'Tools & Equipment',
      description: 'Farm equipment is launching soon. Preview the range and tell us what you need, and we will let you know as soon as it is available.',
      comingSoon: true,
      action: {
        label: 'Notify me',
        message: 'Hello Ogas Integrated Services, please let me know when {name} becomes available.'
      },
      items: [
        {
          name: 'Hoes',
          note: 'Durable, hardwood-handled',
          image: 'assets/images/products/tools/hoe.jpg'
        },
        {
          name: 'Cutlasses',
          note: 'Sharp, hard-wearing steel',
          image: 'assets/images/products/tools/cutlass.jpg'
        },
        {
          name: 'Knapsack Sprayers',
          note: 'For pesticides and fertiliser',
          image: 'assets/images/products/tools/knapsack-sprayer.jpg'
        },
        {
          name: 'Wheelbarrows',
          note: 'Heavy-duty, easy to move',
          image: 'assets/images/products/tools/wheelbarrow.jpg'
        }
      ]
    }
  ]
};