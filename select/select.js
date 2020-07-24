const getTemplate = (data = [],placeholder,seletedId) => {
  let text = placeholder ?? 'placeholder none'
  const items = data.map(item=>{
    let cls = ''
    if(item.id === seletedId){
      cls = 'selected'
      text = item.value
    }
    return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
  })
  return `
  <div class="select__backdrop" data-type="back"></div>
  <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        </div>
        <div class="select__dropdown ">
            <ul class="select__list">
                ${items.join('')}
              </ul>
        </div>`
}


export class Select{
  constructor(selector,options){
    this.$el = document.querySelector(selector)
    this.options = options
    this.seletedId = options.selectedId ?? null
    this.#render()
    this.#setup()
    
  }

  #render(){
    const {placeholder,data} = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data,placeholder,this.seletedId);
  }


  #setup(){
    this.$value = this.$el.querySelector('[data-type="value"]')
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click' ,this.clickHandler)
  }

  clickHandler(event){
      const {type,item} = event.target.dataset
      if(type === 'input'){
        this.toggle()
      }
      else if(type === 'item'){
       const id = event.target.dataset.id
       this.select(id);
       
      } else if(type === 'back'){
        this.close()
      }
  }

  get isOpen(){
    return this.$el.classList.contains('open')
  }

  get current(){
    return this.options.data.find(item=> {
     return String(item.id) === this.seletedId
    })
  }
  select(id){
    this.seletedId = id
    this.$value.textContent = this.current.value
    this.$el.querySelectorAll('[data-type="item"]')
    .forEach(element => {
      element.classList.remove('selected')
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    this.options.onSelect ? this.options.onSelect(this.current) : null
    this.close()
  }

  toggle(){
    this.isOpen ? this.close() : this.open()
  }

  open(){
    this.$el.classList.add('open')
  }

  close(){
    this.$el.classList.remove('open')
  }

  destroy(){
    this.$el.removeEventListener('click' ,this.clickHandler)
    this.$el.innerHTML = ''
  }
}

