const form  = document.querySelector('[data-type="add-to-cart-form"]');
const addToCartBtn = form.querySelector('[type="submit"]')
const quantityInput = document.querySelector('[name="quantity"]')
const productVariantInput = form.querySelector('.product-variant-id')
form.addEventListener('submit',async(e) => {
    e.preventDefault()
    const items = [{
        id: parseInt(productVariantInput.value),
        quantity: quantityInput.valueAsNumber
    }]
    addToCartBtn.setAttribute('aria-disabled', true)
    addToCartBtn.classList.add('loading')
    form.querySelector('.loading-overlay__spinner').classList.remove('hidden')
    // const config = fetchConfig('javascript');
    // config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // delete config.headers['Content-Type'];

    // config.body = formData
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items})
    }

    try {
        const res = await fetch('/cart/add.js',config);
        await res.json()

        const cartRes = await fetch('/cart.js');
        const cartData = await cartRes.json()

        document.querySelector('.cart-count-bubble').textContent = cartData.item_count;
    } catch (error) {
        console.error(error)
    } finally {
        addToCartBtn.setAttribute('aria-disabled', false)
        addToCartBtn.classList.remove('loading')
        form.querySelector('.loading-overlay__spinner').classList.add('hidden')
    }

})