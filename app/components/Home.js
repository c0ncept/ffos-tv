import {Cream, inject} from 'cakejs2-spatial';
import Scrollabl from './Scrollabl';
import Reset from './Reset';

import Weather from './Weather';

Cream.extend({
  _namespace: 'pages.home',
  isDialogShown: false,
  weatherComponent: inject('components.weather'),

  toggleDialog () {
    this.set('isDialogShown', !this.isDialogShown);
  },

  didMount (dom) {
    if (this.isDialogShown) {
      dom.sn.focus(this.btnEl);
    }
    setTimeout(this.get('weatherComponent').updateTime, 1000);
  },

  render () {
    Reset();
    const f = !this.get('isDialogShown');
    return (
      <div className="application">
        { this.isDialogShown === true && (
          <div className="dialog">
            <div className="window">
              Not implemented yet.
              <div focusable={true} ref={(ref) => { this.btnEl = ref; }}
                onEnterx={this.toggleDialog} className="button">Ok</div>
            </div>
          </div>
        )}
        <div className="home-screen">
          <div className="home-screen--background"></div>
          <div className="toolbar">
            <div className="settings" focusable={f} onEnterx={this.toggleDialog}>
              <div className="icons sprite-15"></div>
            </div>
            <Weather />
          </div>
          <Scrollabl className="home-screen--launcher" animate={true}>
            <div></div>
            <div focusable={f}><div className="icons sprite-0"></div></div>
            <div focusable={f}><div className="icons sprite-1"></div></div>
            <div focusable={f}><div className="icons sprite-2"></div></div>
            <div focusable={f}><div className="icons sprite-3"></div></div>
            <div focusable={f}><div className="icons sprite-4"></div></div>
            <div focusable={f}><div className="icons sprite-5"></div></div>
            <div focusable={f}><div className="icons sprite-6"></div></div>
            <div focusable={f}><div className="icons sprite-8"></div></div>
            <div></div>
          </Scrollabl>
        </div>
      </div>
    );
  }
});

