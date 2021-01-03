import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BluetoothIcon = ({ color }) => {
    return (
        <Svg height={80} width={80} viewBox="0 0 256 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <Path d="M142.029889,85.6873567 L170.723389,114.380856 L142.047492,143.050885 L142.029889,85.6873567 L142.029889,85.6873567 L142.029889,85.6873567 Z M142.029889,261.333822 L170.723389,232.646191 L142.047492,203.970294 L142.029889,261.333822 L142.029889,261.333822 L142.029889,261.333822 Z M111.394151,173.51059 L49.3657284,111.323737 L67.3446411,93.3506922 L116.757312,142.786834 L116.757312,24.3161273 L206.622536,114.175484 L147.28743,173.51059 L206.634272,232.863299 L116.76318,322.722655 L116.76318,204.24608 L67.3387733,253.68809 L49.3598606,235.70331 L111.394151,173.51059 L111.394151,173.51059 L111.394151,173.51059 Z M128.011736,347.04465 C203.788393,347.04465 256,311.04575 256,173.516457 C256,35.993032 203.788393,-2.84217094e-14 128.011736,-2.84217094e-14 C52.2409462,-2.84217094e-14 2.84217094e-14,35.9988998 2.84217094e-14,173.516457 C7.57512692e-15,311.04575 52.2350784,347.04465 128.011736,347.04465 L128.011736,347.04465 L128.011736,347.04465 Z" fill={color}>
            </Path>
        </Svg>
    )
}

export const ArrowIcon = ({ color }) => {
    return (
        <Svg height={30} width={30} viewBox="0 0 256 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <Path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z" fill={color}>
            </Path>
        </Svg>
    )
}

export const HomeIcon = ({ color, size }) => {
    return (
        <Svg height={size} width={size} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <Path d="m495.8,274.8l-92.5-102.7c0.1-0.9 0.2-132.9 0.2-132.9 0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v87.8l-91.5-101.5c-7.8-8.6-22.6-8.6-30.3,0l-224.7,249.3c-7.5,8.4-6.9,21.3 1.5,28.8 8.4,7.5 21.3,6.9 28.8-1.5l38.9-43.1v213.8c0,11.3 9.1,20.4 20.4,20.4h300.3c11.3,0 20.4-9.1 20.4-20.4v-213.8l38.8,43.1c4,4.5 9.6,6.7 15.2,6.7 4.9,0 9.7-1.7 13.7-5.2 8.4-7.5 9.1-20.4 1.6-28.8zm-267.6,177.6v-113.1h55.6v113.1h-55.6zm157.5-237.3v237.3h-61.1v-133.5c0-11.3-9.1-20.4-20.4-20.4h-96.4c-11.3,0-20.4,9.1-20.4,20.4v133.6h-61.1v-237.4c0-0.5 0-0.9-0.1-1.4l129.8-144 129.8,144.1c0,0.4-0.1,0.9-0.1,1.3z" fill={color}>
            </Path>
        </Svg>
    )
}

export const LogsIcon = ({ color, size }) => {
    return (
        <Svg height={size} width={size} viewBox="0 0 27.269 27.269" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <Path d="M25.322,1.947H1.949C0.869,1.947,0,2.818,0,3.898v19.477c0,1.074,0.869,1.947,1.949,1.947h23.373 c1.07,0,1.947-0.873,1.947-1.947V3.898C27.27,2.818,26.393,1.947,25.322,1.947z M9.312,3.41c0.537,0,0.973,0.436,0.973,0.975 c0,0.537-0.436,0.973-0.973,0.973c-0.539,0-0.975-0.436-0.975-0.973C8.338,3.845,8.773,3.41,9.312,3.41z M6.33,3.41 c0.537,0,0.975,0.436,0.975,0.975c0,0.537-0.438,0.973-0.975,0.973c-0.539,0-0.975-0.436-0.975-0.973 C5.355,3.845,5.791,3.41,6.33,3.41z M3.406,3.41c0.541,0,0.975,0.436,0.975,0.975c0,0.537-0.434,0.973-0.975,0.973 c-0.535,0-0.971-0.436-0.971-0.973C2.436,3.845,2.871,3.41,3.406,3.41z M25.322,23.375H1.949V6.838h23.373 C25.322,6.838,25.322,23.375,25.322,23.375z" fill={color}>
            </Path>
            <Path d="M14.797,15.566L5.844,20.16v-1.332l7.602-3.781v-0.039l-7.602-3.782V9.894l8.953,4.572V15.566z"/>
            <Path d="M21.422,14.334v1.232h-4.764v-1.232H21.422z"/>
        </Svg>
    )
}

export const SettingsIcon = ({ color, size }) => {
    return (
        <Svg height={size + 10} width={size + 10} viewBox="0 0 20.497 20.497" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <Path d="M14.253,10.832V9.514c0-0.741-0.445-0.944-1.887-1.463c0.609-1.389,0.768-1.848,0.248-2.362 l-0.951-0.928c-0.185-0.182-0.451-0.29-0.714-0.29c-0.177,0-0.36,0-1.671,0.584c-0.574-1.416-0.79-1.852-1.507-1.852H6.426 c-0.708,0-0.921,0.394-1.476,1.861C3.617,4.511,3.43,4.511,3.263,4.511C3,4.511,2.734,4.619,2.551,4.799L1.598,5.731 C1.066,6.254,1.249,6.744,1.875,8.076C0.406,8.648,0,8.846,0,9.568v1.319c0,0.741,0.445,0.945,1.886,1.464 c-0.608,1.387-0.765,1.846-0.248,2.359l0.948,0.927c0.184,0.184,0.453,0.294,0.717,0.294c0.176,0,0.359,0,1.671-0.585
                c0.575,1.416,0.79,1.853,1.508,1.853h1.346c0.707,0,0.921-0.395,1.477-1.863c1.334,0.556,1.52,0.556,1.686,0.556
                c0.262,0,0.528-0.108,0.712-0.288l0.959-0.938c0.526-0.523,0.344-1.013-0.282-2.34C13.811,11.767,14.253,11.553,14.253,10.832z
                M10.948,14.722c-0.127-0.034-0.485-0.152-1.441-0.556l-0.22-0.093l-0.878,0.355l-0.09,0.237
                c-0.106,0.286-0.408,1.091-0.568,1.375l-1.196-0.001c-0.163-0.274-0.481-1.062-0.61-1.381l-0.092-0.227l-0.878-0.354l-0.226,0.102
                c-0.947,0.429-1.294,0.55-1.403,0.583l-0.842-0.824c0.085-0.312,0.425-1.084,0.563-1.396l0.101-0.228l-0.364-0.862l-0.239-0.086
                c-0.323-0.115-1.121-0.401-1.407-0.556V9.644c0.279-0.157,1.058-0.459,1.414-0.597l0.229-0.089l0.364-0.863L3.054,7.862
                C2.923,7.587,2.559,6.816,2.465,6.501l0.84-0.822c0.127,0.034,0.486,0.15,1.444,0.554l0.22,0.094l0.876-0.355l0.089-0.238
                c0.106-0.286,0.408-1.09,0.567-1.375h1.196c0.163,0.275,0.481,1.063,0.61,1.382l0.092,0.227l0.877,0.355L9.503,6.22
                c0.948-0.429,1.294-0.55,1.403-0.583l0.843,0.824c-0.085,0.311-0.426,1.083-0.563,1.396l-0.101,0.229L11.45,8.95l0.239,0.085
                c0.322,0.116,1.118,0.401,1.406,0.555l-0.001,1.163c-0.283,0.162-1.088,0.474-1.414,0.601l-0.229,0.089l-0.362,0.864l0.11,0.232
                c0.13,0.274,0.495,1.045,0.59,1.359L10.948,14.722z" fill={color}
            >
            </Path>
            <Path d="M7.127,8.117C5.954,8.117,5,9.052,5,10.201s0.954,2.085,2.127,2.085s2.127-0.936,2.127-2.085
                S8.3,8.117,7.127,8.117z M7.127,11.129c-0.535,0-0.971-0.417-0.971-0.928c0-0.511,0.436-0.927,0.971-0.927s0.97,0.416,0.97,0.927
                C8.097,10.712,7.662,11.129,7.127,11.129z" fill={color}
            >
            </Path>
            <Path d="M19.634,13.107c0.279-0.636,0.352-0.846,0.114-1.081l-0.437-0.425
                c-0.084-0.084-0.206-0.133-0.326-0.133c-0.081,0-0.164,0-0.765,0.268c-0.263-0.648-0.361-0.848-0.689-0.848h-0.615
                c-0.324,0-0.422,0.181-0.676,0.852c-0.609-0.253-0.695-0.253-0.771-0.253c-0.12,0-0.242,0.05-0.326,0.132l-0.437,0.427
                c-0.243,0.239-0.159,0.464,0.127,1.073c-0.673,0.262-0.857,0.353-0.857,0.683v0.604c0,0.339,0.203,0.433,0.863,0.67
                c-0.278,0.635-0.351,0.845-0.114,1.08l0.434,0.424c0.085,0.084,0.208,0.134,0.329,0.134c0.08,0,0.164,0,0.765-0.268
                c0.263,0.648,0.361,0.848,0.689,0.848h0.616c0.323,0,0.421-0.18,0.676-0.852c0.61,0.254,0.695,0.254,0.771,0.254
                c0.12,0,0.242-0.05,0.326-0.132l0.438-0.43c0.241-0.239,0.157-0.463-0.129-1.07c0.655-0.256,0.857-0.354,0.857-0.684v-0.604
                C20.497,13.437,20.294,13.344,19.634,13.107z M19.968,14.344c-0.129,0.074-0.498,0.217-0.647,0.274l-0.104,0.041l-0.166,0.395
                l0.051,0.107c0.06,0.125,0.227,0.478,0.27,0.622l-0.385,0.376c-0.059-0.016-0.223-0.069-0.66-0.254l-0.101-0.043l-0.401,0.163
                l-0.041,0.108c-0.049,0.131-0.187,0.499-0.26,0.629h-0.548c-0.074-0.126-0.221-0.486-0.279-0.632l-0.042-0.104l-0.401-0.163
                L16.15,15.91c-0.434,0.196-0.593,0.251-0.643,0.267l-0.385-0.378c0.039-0.142,0.194-0.495,0.257-0.638l0.046-0.105l-0.166-0.394
                l-0.109-0.04c-0.147-0.053-0.513-0.184-0.644-0.254v-0.534c0.128-0.071,0.484-0.21,0.646-0.273l0.105-0.04l0.166-0.396
                l-0.05-0.106c-0.061-0.125-0.227-0.478-0.27-0.622l0.385-0.376c0.058,0.015,0.222,0.068,0.66,0.254l0.101,0.043l0.401-0.162
                l0.04-0.109c0.05-0.131,0.187-0.499,0.26-0.629h0.548c0.074,0.126,0.22,0.487,0.279,0.633l0.042,0.104l0.401,0.163l0.104-0.047
                c0.434-0.197,0.593-0.252,0.643-0.267l0.386,0.377c-0.04,0.142-0.195,0.495-0.259,0.639l-0.046,0.104l0.167,0.396l0.109,0.039
                c0.148,0.053,0.513,0.184,0.644,0.254C19.968,13.813,19.968,14.344,19.968,14.344z" fill={color}
            >
            </Path>
            <Path d="M17.236,13.137c-0.536,0-0.973,0.428-0.973,0.953c0,0.526,0.437,0.954,0.973,0.954
                c0.537,0,0.974-0.428,0.974-0.954C18.21,13.565,17.773,13.137,17.236,13.137z M17.236,14.515c-0.245,0-0.444-0.19-0.444-0.425
                c0-0.233,0.199-0.424,0.444-0.424s0.444,0.19,0.444,0.424C17.681,14.325,17.481,14.515,17.236,14.515z" fill={color}
            >
            </Path>
        </Svg>
    )
}
