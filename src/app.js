document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Black Robusta",
        image: "Product1.jpg",
        price: 30000,
      },
      {
        id: 2,
        name: "Beens Blend",
        image: "Product2.jpg",
        price: 25000,
      },
      {
        id: 3,
        name: "Kiro Robusta",
        image: "Product3.jpg",
        price: 20000,
      },
      {
        id: 4,
        name: "Aka Arabica Blend",
        image: "Product4.jpg",
        price: 30000,
      },
      {
        id: 5,
        name: "Robusta Japan",
        image: "Product5.jpg",
        price: 28000,
      },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    qty: 0,
    add(newItem) {
      //cek apakah ada barang yang sama dicart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      //jika belum ada barang
      if (!cartItem) {
        this.items.push({ ...newItem, qty: 1, total: newItem.price });
        this.qty++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada tambah qty dan subtotalnya
            item.qty++;
            item.total = item.price * item.qty;
            this.qty++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    delete(id) {
      //ambil item yang mau di hapus berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item  lebih dari 1
      if (cartItem.qty > 1) {
        //telusuri satu satu
        this.items = this.items.map((item) => {
          //jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.qty--;
            item.total = item.price * item.qty;
            this.qty--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.qty === 1) {
        //jika barangnya tinggal 1
        this.items = this.items.filter((item) => item.id !== id);
        this.qty--;
        this.total -= cartItem.price;
      }
    },
  });
});

//form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.add("disabled");
      checkoutButton.classList.remove("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objectData = Object.fromEntries(data);
  // const pesan = formatPesan(objectData);
  // window.open("http://wa.me/6285721720565?text=" + encodeURIComponent(pesan));

  //minta transaksi token menggunakan ajax/fetch
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    console.log(token);
    //window.snap.pay(token);
  } catch (error) {
    console.log(error.message);
  }
});

//format pesan wa
// const formatPesan = (object) => {
//   return `Data Customer
//   Nama: ${object.nama}
//   Email: ${object.email}
//   HP: ${object.hp}
//   Data pesanan
//   ${JSON.parse(object.items).map(
//     (item) => `${item.name}
//   (${item.qty} x ${rupiah(item.total)}) \n`
//   )}
//   Total bayar: ${rupiah(object.total)}
//   Terima kasih.`;
// };

//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
