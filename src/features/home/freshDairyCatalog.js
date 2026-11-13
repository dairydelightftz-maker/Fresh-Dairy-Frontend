export const paneerProducts = [
    ["Fresh Paneer", "22.00", "1 kg"],
    ["Malai Paneer", "32.00", "1 kg"],
    ["Garlic & Herb Paneer", "35.00", "1 kg"],
    ["Lemongrass & Ginger Paneer", "35.00", "1 kg"],
    ["Minty Fresh Paneer", "35.00", "1 kg"],
    ["Smoked Paprika Paneer", "39.00", "1 kg"],
    ["Spicy Chilli Paneer", "36.00", "1 kg"],
    ["Cayenne Pepper & Cumin Paneer", "36.00", "1 kg"],
    ["Cranberry & Orange Paneer", "42.00", "1 kg"],
    ["Fig & Honey Paneer", "45.00", "1 kg"],
    ["Pineapple & Coconut Paneer", "42.00", "1 kg"],
    ["Sweet Mango Paneer", "39.00", "1 kg"],
    ["Basil & Sun Paneer", "35.00", "1 kg"],
    ["Garam Masala & Coriander Paneer", "35.00", "1 kg"],
    ["Saffron & Cardamom Paneer", "39.00", "1 kg"],
].map(([name, price, unit]) => ({ name, price, unit }));

export const kulfiProducts = [
    { name: "Malai Kulfi", price: "2.50", unit: "" },
    { name: "Matka Kulfi", price: "6.50", unit: "" },
    { name: "Rabri", price: "10.00", unit: "200 g" },
];

export const sweetProducts = [
    { name: "Motichur Laddu", price: "90.00", unit: "1 kg" },
    { name: "Bundi Laddu", price: "60.00", unit: "1 kg" },
    { name: "Jilebi", price: "40.00", unit: "1 kg" },
    { name: "Kaju Mix", price: "110.00", unit: "1 kg" },
    { name: "Emarti", price: "80.00", unit: "1 kg" },
];

export const whatsappOrderUrl = (productName = "") => {
    const message = productName
        ? `Hello Fresh Dairy Delight, I would like to enquire about ${productName}.`
        : "Hello Fresh Dairy Delight, I would like to enquire about your products.";
    return `https://wa.me/97152539846?text=${encodeURIComponent(message)}`;
};
