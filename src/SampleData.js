const list = [
    {
        id: 13,
        name: "Lorem ipsum dolor sit amet consectetur.",
        image: "https://cdn.pixabay.com/photo/2019/04/11/17/42/beauty-4120283_1280.jpg",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 3500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 1,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/3687550/pexels-photo-3687550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 2,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/1187822/pexels-photo-1187822.jpeg?auto=compress&cs=tinysrgb&w=800",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 3,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/3014853/pexels-photo-3014853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },

    {
        id: 4,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/2072583/pexels-photo-2072583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 5,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/995978/pexels-photo-995978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 6,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 7,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://cdn.pixabay.com/photo/2014/06/05/14/39/saree-362757_1280.jpg",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },
    {
        id: 8,
        name: "Lorem ipsum dolor sit amet consectetur.",
       image: "https://images.pexels.com/photos/458669/pexels-photo-458669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // ✅ Correct relative path from public folder
        originalPrice: 5000,
        discountedPrice: 2500,
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
        longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
        sizes: [24, 26, 28, 30, 32, 34],
        colors: ["#F9A825", "#154718", "#00274D", "#000000"],

    },

];

export default list;