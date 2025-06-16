const list = [
    {
      id: 0,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 11.png",  // ✅ Correct relative path from public folder
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
      image: "/Rectangle 4 (2).png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 5 (2).png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 11.png",  // ✅ Correct relative path from public folder
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
      image: "/Rectangle 13.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 4,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 14.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 5,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 15.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 6,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 16.png",  // ✅ Correct relative path from public folder
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
      image: "/Rectangle 9.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 4500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 8,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 8.png",  // ✅ Correct relative path from public folder
      originalPrice: 1000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 9,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 7.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 10,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 12.png",  // ✅ Correct relative path from public folder
      originalPrice: 1500,
      discountedPrice: 1000,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 11,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 12.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
    {
      id: 12,
      name: "Lorem ipsum dolor sit amet consectetur.",
      image: "/Rectangle 6.png",  // ✅ Correct relative path from public folder
      originalPrice: 5000,
      discountedPrice: 3500,
      description: "Lorem ipsum dolor sit amet consectetur. Ultricies enim diam pellentesque blandit aliquet facilisis. Imperdiet sollicitudin felis tempus nibh praesent. Proin cras egestas quis egestas. Tortor posuere vel malesuada adipiscing morbi duis pretium.",
      longDescription: "Lorem ipsum dolor sit amet consectetur. Vitae ornare amet laoreet eget. Cras sagittis volutpat sapien pulvinar. Ipsum blandit ut aliquam arcu. Orci est amet orci semper massa lectus. Commodo dignissim quis aliquam volutpat. Scelerisque in vitae et eu urna. Quam a consectetur ac quis rhoncus. Malesuada faucibus ornare semper sagittis in consequat consectetur elit condimentum. Ac id ut nibh enim neque eu venenatis pharetra tellus.",
      sizes: [24, 26, 28, 30, 32, 34],
      colors: ["#F9A825", "#154718", "#00274D", "#000000"],
    },
  
  ];
  export default list;