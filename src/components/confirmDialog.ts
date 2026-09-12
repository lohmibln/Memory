/**
 * Modal confirm dialog. Returns a promise that resolves to true (confirm) or
 * false (cancel). Focus is trapped on the dialog while it is open.
 */
export function showConfirmDialog(options: {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
}): Promise<boolean> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-dialog';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'confirm-dialog-title');

    const panel = document.createElement('div');
    panel.className = 'confirm-dialog__panel';

    const title = document.createElement('h2');
    title.id = 'confirm-dialog-title';
    title.className = 'confirm-dialog__title';
    title.textContent = options.title;

    const actions = document.createElement('div');
    actions.className = 'confirm-dialog__actions';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'btn btn--ghost confirm-dialog__btn confirm-dialog__btn--cancel';
    cancel.textContent = options.cancelLabel ?? 'No';

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'btn btn--primary confirm-dialog__btn';
    confirm.textContent = options.confirmLabel ?? 'Yes';

    const close = (result: boolean): void => {
      document.removeEventListener('keydown', onKeyDown);
      overlay.remove();
      resolve(result);
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [cancel, confirm];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    cancel.addEventListener('click', () => close(false));
    confirm.addEventListener('click', () => close(true));
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close(false);
    });

    actions.append(cancel, confirm);
    panel.append(title, actions);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', onKeyDown);
    cancel.focus();
  });
}
