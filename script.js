const getTransitionDuration = element => {
  const duration = getComputedStyle(element)['transitionDuration'];
  return duration.includes('ms') ? parseFloat(duration) : parseFloat(duration) * 1000;
};

class ToastNotifications {
  static hideDelay = 5000;

  constructor() {
    this.toastNode = document.createElement('div');
    this.toastNode.classList.add('toast');
    document.body.appendChild(this.toastNode);
  }

  scheduleHiding(messageNode) {
    setTimeout(
      () => this.hideMessageNode(messageNode),
      ToastNotifications.hideDelay
    );
  }

  getCrossIcon() {
    const tmpContainer = document.createElement('div');
    tmpContainer.innerHTML = '<svg class="toast__message-cross-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.334" fill="currentColor"><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/></svg>';
    return tmpContainer.firstChild;
  }

  getMessageNode({ title = '', text = '' } = {}) {
    const messageNode = document.createElement('div');
    const messageTitle = document.createElement('div');
    const crossIcon = this.getCrossIcon();
    
    crossIcon.addEventListener('click', () => this.hideMessageNode(messageNode));
    messageTitle.classList.add('toast__message-title');
    messageTitle.appendChild(document.createTextNode(title));
    messageNode.classList.add('toast__message');
    messageNode.appendChild(messageTitle);
    messageNode.appendChild(document.createTextNode(text));
    messageNode.appendChild(crossIcon);
    
    return messageNode;
  }
  
  showMessageNode(messageNode) {
    messageNode.classList.add('toast__message--hidden');

    requestAnimationFrame(() => {
      this.toastNode.appendChild(messageNode);
      requestAnimationFrame(() => {
        messageNode.classList.remove('toast__message--hidden');
      });
    });

    this.scheduleHiding(messageNode);
  }

  hideMessageNode(messageNode) {
    messageNode.classList.add('toast__message--hidden');
    setTimeout(
      () => {
        if (this.toastNode.contains(messageNode)) {
          this.toastNode.removeChild(messageNode);  
        }
      },
      getTransitionDuration(messageNode)
    );
  }

  showSuccess({ title = '', text = '' } = {}) {
    const messageNode = this.getMessageNode({ title, text });
    messageNode.classList.add('toast__message--success');
    this.showMessageNode(messageNode);
  }

  showInfo({ title = '', text = '' } = {}) {
    const messageNode = this.getMessageNode({ title, text });
    messageNode.classList.add('toast__message--info')
    this.showMessageNode(messageNode);
  }

  showWarning({ title = '', text = '' } = {}) {
    const messageNode = this.getMessageNode({ title, text });
    messageNode.classList.add('toast__message--warning')
    this.showMessageNode(messageNode);
  }

  showError({ title = '', text = '' } = {}) {
    const messageNode = this.getMessageNode({ title, text });
    messageNode.classList.add('toast__message--error')
    this.showMessageNode(messageNode);
  }
}



const toastNotifications = new ToastNotifications();

const [
  successButton,
  infoButton,
  warningButton,
  errorButton
] = document.querySelectorAll('button');

successButton.addEventListener('click', () => toastNotifications.showSuccess({
  title: 'Success',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}));

infoButton.addEventListener('click', () => toastNotifications.showInfo({
  title: 'Info',
  text: 'Vitae congue mauris rhoncus aenean vel elit scelerisque mauris.'
}));

warningButton.addEventListener('click', () => toastNotifications.showWarning({
  title: 'Warning',
  text: 'Elementum nibh tellus molestie nunc.'
}));

errorButton.addEventListener('click', () => toastNotifications.showError({
  title: 'Error',
  text: 'Vivamus arcu felis bibendum ut tristique et egestas quis ipsum.'
}));