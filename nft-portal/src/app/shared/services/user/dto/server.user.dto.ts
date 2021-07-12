import { DateUtils } from './../../../utils/date.utils';


export class ServerUserDto {
    address: string;
    name?: string;
    createdDate: Date;
    modifiedDate: Date;

    constructor(address: string, name?: string) {
        this.address = address;
        this.name = name;

        const nowInUTC = DateUtils.toUTC(new Date());
        this.createdDate = nowInUTC;
        this.modifiedDate = nowInUTC;
    }
}
