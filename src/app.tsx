import * as React from 'react';
import * as ReactDOM from 'react-dom';

function App() {
    const [wattSec, setWattSec] = React.useState(0)
    const [wattSecForMin, setWattSecForMin] = React.useState(0)
    const [wattSecForSec, setWattSecForSec] = React.useState(0)

    // minboxかsecboxが操作されると、minboxとsecboxからwattsecを計算してsetWattSecする
    const onMinBoxChange = React.useCallback((power: number) => (n: number) => {
        const ws = n * 60 * power
        setWattSecForMin(ws)
        setWattSec(ws + wattSecForSec)
        setWattSecForMin(ws)

    }, [setWattSecForMin, setWattSecForMin, wattSecForSec])
    const onSecBoxChange = React.useCallback((power: number) => (n: number) => {
        const ws = n * power
        setWattSecForSec(ws)
        setWattSec(wattSecForMin + ws)
        setWattSecForSec(ws)
    }, [setWattSecForSec, setWattSec, wattSecForMin])

    return (
        <div className="col">
            <TimeBox powerLabel="500W" power={500} wattSec={wattSec} onMinBoxChange={onMinBoxChange(500)} onSecBoxChange={onSecBoxChange(500)} />
            <TimeBox powerLabel="600W" power={600} wattSec={wattSec} onMinBoxChange={onMinBoxChange(600)} onSecBoxChange={onSecBoxChange(600)} />
            <TimeBox powerLabel="1500W" power={1500} wattSec={wattSec} onMinBoxChange={onMinBoxChange(1500)} onSecBoxChange={onSecBoxChange(1500)} />
            => {wattSec / 1000} kW*sec
        </div>
    )
}

interface TimeBoxProps {
    powerLabel: string,
    power: number,
    wattSec: number,
    onMinBoxChange: (n: number) => void,
    onSecBoxChange: (n: number) => void,
}

function wsConvert(ws: number, power: number): { m: number, s: number } {
    const allSec = ws / power
    const s = allSec % 60
    return { s: s, m: (allSec - s) / 60 }
}

function TimeBox(props: TimeBoxProps) {
    const getAllSec = (wattSec: number) => wattSec / props.power
    const getMin = React.useCallback((wattSec: number) => {
        return (getAllSec(wattSec) - getSec(wattSec)) / 60
    }, [props.power])
    const getSec = React.useCallback((wattSec: number) => {
        return getAllSec(wattSec) % 60
    }, [props.power])
    const minBox = <MinBox onChanged={props.onMinBoxChange} value={getMin(props.wattSec)} />
    const secBox = <SecBox onChanged={props.onSecBoxChange} value={getSec(props.wattSec)} />

    return (
        <div className="row">
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <span className="input-group-text">{props.powerLabel}</span>
                </div>
                {minBox}<div className="input-group-append input-group-prepend"><span className="input-group-text">:</span></div>{secBox}
            </div>
        </div>
    )
}

interface BoxProps {
    onChanged: ((n: number) => void),
    value: number,
}

function MinBox(props: BoxProps) {
    const onChange = React.useCallback((e: React.FormEvent) => {
        const val = Number.parseFloat((e.target! as HTMLInputElement).value)
        props.onChanged(val)
    }, [props.onChanged])
    return <input className="form-control" type="number" min="0" value={props.value} onChange={onChange} />
}

function SecBox(props: BoxProps) {
    const onChange = React.useCallback((e: React.FormEvent) => {
        const val = Number.parseFloat((e.target! as HTMLInputElement).value)
        props.onChanged(val)
    }, [props.onChanged])
    return <input className="form-control" type="number" min="0" max="59" value={props.value} onChange={onChange} />
}

// initialize
ReactDOM.render(
    <App />,
    document.querySelector('.content'),
);
