import { BackgroundModule } from './background.module';
import {CustomMessageModule} from './custom-message.module'
import { CountdownTimerModule } from './countdown-timer.module';

export const components = {
	backgroundModule: new BackgroundModule('backgroundModule', 'Поменять цвет фона'),
	customMessageModule: new CustomMessageModule('customMessageModule', 'Вызвать сообщение'),
	countdownTimerModule: new CountdownTimerModule('countdownTimerModule', 'Вызвать таймер'),
};
