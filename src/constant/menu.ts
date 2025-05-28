export const menuItems = [
    {
        id: 2,
        title: "Inventario",
        icon: "productos",
        screen: "ProductoScreen",
        role: "admin", // Solo para admin
    },
    {
        id: 3,
        title: "Recetas",
        icon: "recetas",
        screen: "RecetaList",
        role: "admin", 
    },
    {
        id: 4,
        title: "Movimiento",
        icon: "movimientos",
        screen: "Movimientos",
        role: "admin", 
    },
    {
        id: 5,
        title: "Ordenes",
        icon: "ordenes",
        screen: "OrdenesAdmin",
        role: "admin", 
    },
    {
        id: 5,
        title: "Ordenes de producción",
        icon: "ordenes",
        screen: "OrdenesAdmin",
        role: "user", 
    },
];