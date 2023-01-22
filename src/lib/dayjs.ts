import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';

dayjs.locale('pt-br');
dayjs.extend(utc)