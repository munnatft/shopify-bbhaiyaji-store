const cartCountElement = document.querySelector('.cart-count-bubble')
const cartItems = document.querySelectorAll('.cart-item');
const format = document.querySelector('[data-money-format]').getAttribute('data-money-format')

cartItems.forEach((cartItem) => {
  const minusBtn = cartItem.querySelector('[name="minus"]')
  const plusBtn = cartItem.querySelector('[name="plus"]')
  const quantityInput = cartItem.querySelector('.quantity__input')
  const lineItemKey = cartItem.getAttribute('data-line-item-key')
  const loaderElement = cartItem.querySelector('.loading-spinner')
  const removeElement = cartItem.querySelector('.cart__remove__icon')

  plusBtn.addEventListener('click',() => {
    quantityInput.value = quantityInput.valueAsNumber+1
    changeItemQuantity(lineItemKey,quantityInput.valueAsNumber,loaderElement)
  })

  minusBtn.addEventListener('click',() => {
    quantityInput.value = quantityInput.valueAsNumber === 1 ? 1 : quantityInput.valueAsNumber-1
    changeItemQuantity(lineItemKey,quantityInput.valueAsNumber,loaderElement)
  })

  removeElement.addEventListener('click',(e) => {
    e.preventDefault()
    // remove ajax api functionality
    removeItem(lineItemKey,cartItem,loaderElement)
  })

})

const changeItemQuantity = async(key, quantity, loaderElement) => {
  const qtyData = {id:key,quantity}

  const config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(qtyData)
  }

  try {
    loaderElement.classList.add('show-loading-spinner')
    const res = await fetch("/cart/change.js",config)
    const cart = await res.json()
    
    const item = cart.items.find(item => item.key === key)

    cartCountElement.textContent = cart.item_count
    document.querySelector('.totals__subtotal-value').textContent = moneyFormatter(cart.total_price,format)
    document.querySelector(`[data-line-item-key="${key}"] .line-item-price`).textContent = moneyFormatter(item.final_line_price,format)
  } catch (error) {
    console.error(error)
  } finally {
    loaderElement.classList.remove('show-loading-spinner')
  }
}

const removeItem = async(key,cartItem,loaderElement) => {
  const qtyData = {id:key,quantity:0}

  const config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(qtyData)
  }

  try {
    loaderElement.classList.add('show-loading-spinner')
    const res = await fetch("/cart/change.js",config)
    const cart = await res.json()

    cartItem.remove()

    if(cart.items.length === 0) {
      // show empty cart text and empty cart count inthe header section
      cartCountElement.textContent = ''
      document.querySelector('#main-cart-footer').classList.add("is-empty")
      document.querySelector('#main-cart-items').classList.add("is-empty")
    }

    document.querySelector('.totals__subtotal-value').textContent = moneyFormatter(cart.total_price,format)
  } catch (error) {
    console.error(error)
  } finally {
    loaderElement.classList.remove('show-loading-spinner')
  }
}

function moneyFormatter(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};