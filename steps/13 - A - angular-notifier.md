https://www.npmjs.com/package/angular-notifier

`npm i angular-notifier`

add in `styles.css`: `@import "~angular-notifier/styles";`

in `app.module`: `import { NotifierModule } from 'angular-notifier';`

```
imports: [NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10,
        },
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    }),
  ],
```

in the component you want to use: `import { NotifierService } from 'angular-notifier';`

in the constructor: `constructor(private readonly notifier: NotifierService) {}`
